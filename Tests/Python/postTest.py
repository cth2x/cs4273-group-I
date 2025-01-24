import unittest
import requests
import time

post_url = "http://localhost:3000/api/persons"

def post_person(params):
    r = requests.post(post_url, json=params)
    return r.status_code

class TestPostFunctionality(unittest.TestCase):
    def test_full_request(self):
        self.assertEqual(post_person({'id': 123, 'name': 'Bob Miller', 'age': 40, 'date': time.time(), 'location': 'Alaska'}), requests.codes.created)

    def test_partial_request(self):
        self.assertEqual(post_person({'id': 124, 'name': 'Bill Stephenson', 'age': 34}), requests.codes.created)

    def test_missing_name(self):
        self.assertEqual(post_person({'id': 125, 'age': 23}), requests.codes.bad)


if __name__ == '__main__':
    unittest.main()
    
        
    
