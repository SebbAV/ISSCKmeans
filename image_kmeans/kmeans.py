import numpy as np
from PIL import Image
import random
import sys
import codecs
import json
import pandas as pd
np.set_printoptions(threshold=np.nan)
param = sys.argv
param.remove(param[0])
class kmeans():
    def __init__(self, filepath, k = 10):
        self.img = Image.open(filepath)
        self.k = k

        self.arr = np.array(self.img)

        m, n, _ = self.arr.shape
        idx_lst = [ (j,k) for j in range(m) for k in range(n) ]
        k_vals = random.sample(idx_lst, self.k)

        self.d_k_clusters = { (k_mn + tuple(self.arr[k_mn])): [] for k_mn in k_vals }
        self.d_k_clusters_lst = [self.d_k_clusters]

        self.idx_arr = np.array(idx_lst).reshape((m, n, 2))


    def minimize_distance(self, pixel, metric):

        dists = [ (k, metric(np.array(pixel), np.array(k))) for k in self.d_k_clusters.keys() ]

        best_k, _ = min( dists, key = lambda t: t[1] )
        return best_k


    def minimize_distance_arr(self, pixel, metric):

        dists = [ (k, metric(pixel, np.array(k))) for k in self.d_k_clusters.keys() ]

        best_k, _ = min( dists, key = lambda t: t[1] )
        return best_k


    def assign_pixels_for_loop(self, metric):
        def mn2mnrgb(self, t_mn):
            return np.append(t_mn, self.arr[t_mn[0], t_mn[1]])

        for tup in ( (m,n) for m in range(0, self.arr.shape[0]) \
                               for n in range(0, self.arr.shape[1]) ):
            tval = self.mn2mnrgb(tup)
            self.d_k_clusters[ self.minimize_distance( tval, metric ) ].append(tval)


    def assign_pixels_nditer(self, metric):

        it = np.nditer(self.arr, flags=['multi_index'])
        tval = []
        while not it.finished:

            i, j, rgb_i = it.multi_index

            if rgb_i == 0:
                tval = [i, j]

            tval.append(int(it[0]))

            if rgb_i == 2:

                self.d_k_clusters[ self.minimize_distance( tval, metric ) ].append(tval)
                tval = []
            it.iternext()


    def assign_pixels_map(self, metric):

        self.arr_extended = np.concatenate((self.idx_arr, self.arr), axis=2)

        def update_clusters(pixelval):
            self.d_k_clusters[ self.minimize_distance( pixelval, metric ) ].append(pixelval)
            return pixelval

        np.apply_along_axis(update_clusters, 2, self.arr_extended)


    def generate_image(self, warholize=False):
        
        def mean_mnrgb(v_lst):

            new_centroid = np.mean( np.array(v_lst), axis=0 )
            return tuple(new_centroid)

        self.d_k_clusters_lst.append( { mean_mnrgb(v): v for v in self.d_k_clusters.values() } )
        self.d_k_clusters = self.d_k_clusters_lst[-1]

        self.new_arr = np.empty(self.arr.shape, dtype=np.uint8)

        if warholize:
            random_colors = random_color_palette(self.k)

        for i, (k, v_lst) in enumerate(self.d_k_clusters.items()):
            pixelval = ( random_colors[i] if warholize else [int(rgb) for rgb in k[-3:]] )
            for m, n, _r, _g, _b in v_lst:
                self.new_arr[m, n] = pixelval

        self.new_img = Image.fromarray(self.new_arr)
        dic = {}
        dic['rgb'] = self.new_arr

        print(pd.Series(dic).to_json(orient='values'))

def euclidean_dist_np(p1,p2):
     return np.linalg.norm(p1-p2)



def random_color_palette(n, RGB=True):
    SATURATION = 0.6
    VALUE = 0.95
    GOLDEN_RATIO_INVERSE = 0.618033988749895
    # random float in [0.0, 1.0)
    hue = random.random()
    l_hues = [hue]

    for i in range(n-1):
        hue += GOLDEN_RATIO_INVERSE
        hue %= 1
        l_hues.append(hue)

    return [ (h, SATURATION, VALUE) for h in l_hues ]


def implement(infile, k, warholize=False):
    x = kmeans(infile, k=k)
    x.assign_pixels_map(metric=euclidean_dist_np)
    x.generate_image(warholize=warholize)


FILE_IN = 'C:\\Users\\Joche\\Documents\\Salle Bajio 7mo Semestre\\Desarrollo Colaborativo\\REPO_Colaborativo\\ISSCKmeans\\backend\\issckmeans_api\\scripts\\house.jpg'
K = int(param[0])


if __name__ == "__main__":
    implement(FILE_IN, K)