import unittest
import requests
import time

post_url = "http://localhost:4200/api/persons"

def post_person(params):
    r = request.post(post_url, params)
    return r.status_code

class TestPostFunctionality(unittest.TestCase):
    def test_full_request(self):
        self.assertEqual(post_person({'id': 123, 'name': 'Bob Miller', 'age': 40, 'date': time.time(), 'location': 'Alaska'}), request.codes.created)

    def test_partial_request(self):
        self.assertEqual(post_person({'id': 124, 'name': 'Bill Stephenson', 'age': 34}), request.codes.created)

    def test_missing_name(self):
        self.assertEqual(post_person({'id': 125, 'age': 23}), request.codes.bad)

    
        
    
