import os
import re
import logging
from gensim.models import word2vec

class Sentences(object):
    def __init__(self, path=None):
        if not path:
            path = "corpus"
        self.path = path

    def __iter__(self):
        for file_name in os.listdir(self.path):
            # Ignore hidden files e.g. .DS_Store
            if file_name.startswith('.'):
                continue
            for line in open(os.path.join(self.path, file_name)):
                # Remove 's from sentences like "It's Paul's dog."
                line = re.sub(r'\'s', '', line)
                # Keep only letters a to z and dashes
                line = re.sub(r'[^a-zA-Z-]+', ' ', line)
                # Dash is the only special character we keep. It's only
                # useful when it's between two words e.g. ice-cream
                line = re.sub(r'^-|-$|(\s-)+|(-\s)+|[-]{2,}', ' ', line)
                # Ignore case
                line = line.lower()
                yield line.split()

logging.basicConfig(
    format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)

def train():
    sentences = Sentences()
    model = word2vec.Word2Vec(
        sentences, sg=1, size=200, window=5, min_count=5, iter=5)
    model.save('vectors.model')

if __name__ == "__main__":
    train()
