import unittest
import requests
import time

post_url = "http://localhost:3000/api/persons"


# Takes a dictionary of case details and attempts to create it on the server 
def post_person(params):
    r = requests.post(post_url, json=params)
    return r.status_code


class TestPostFunctionality(unittest.TestCase):
    # Tests a request with all fields
    def test_full_request(self):
        self.assertEqual(post_person({'id': 123, 'name': 'Bob Miller', 'age': 40, 'date': time.time(), 'location': 'Alaska'}), requests.codes.created)


    # Tests request without optional fields
    def test_partial_request(self):
        self.assertEqual(post_person({'id': 124, 'name': 'Bill Stephenson', 'age': 34}), requests.codes.created)

    # Test request without a name
    def test_missing_name(self):
        self.assertEqual(post_person({'id': 125, 'age': 23}), requests.codes.bad)

    def test_missing_id(self):
        self.assertEqual(post_person({'name': 'Stephen Michael', 'age': 10}), requests.codes.bad)

    def test_negative_age(self):
        self.assertEqual(post_person({'id': 126, 'name': 'Sarah Steinbeck', 'age': -2}), requests.codes.bad)


if __name__ == '__main__':
    unittest.main()
    
        
    
