import os
import sys 
current_dir = os.path.abspath(os.path.dirname(__file__))
root_dir = os.path.join(current_dir, '../')
sys.path.append(root_dir)
lib_dir = os.path.join(root_dir, './lib')
sys.path.append(lib_dir)

import argparse
from encrypt.decrypt import encrypt

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='An example script to read command-line arguments')
    parser.add_argument('raw_string', help='raw_string')
    args = parser.parse_args()
    print('encrypt string:', encrypt(args.raw_string))