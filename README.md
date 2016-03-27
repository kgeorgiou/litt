# [LITT.](http://litt.kg.gg) 

A thesaurus for legal terms.

The underlying language model was trained on a corpus of court cases using the Python version of [word2vec](https://radimrehurek.com/gensim/models/word2vec.html).

To train your own model on a different corpus, put all text files in ``word2vec/train/corpus/`` directory and place the trained model in ``word2vec/test/models/vectors.model``.

Notes:
I have omitted the corpus text files and the trained model's file because of their large size.
