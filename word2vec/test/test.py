from gensim.models import word2vec
import zerorpc
import json

class SimilarWords(object):
    def __init__(self):
        self.model = word2vec.Word2Vec.load('models/vectors.model')

    def findSimilarWords(self, word, n=10):
        result = []
        try:
            result = self.model.most_similar(word, topn=n)
        except KeyError:
            result = []

        return json.dumps(result)

s = zerorpc.Server(SimilarWords())
s.bind("tcp://127.0.0.1:4004")
s.run()
