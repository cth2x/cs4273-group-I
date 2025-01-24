require 'net/http'
require 'json'
require 'test/unit'

POST_URL = 'http://localhost:3000/api/persons'

# Function to send a POST request
def post_person(params)
  uri = URI(POST_URL)
  headers = { 'Content-Type' => 'application/json' }
  http = Net::HTTP.new(uri.host, uri.port)
  request = Net::HTTP::Post.new(uri.path, headers)
  request.body = params.to_json

  response = http.request(request)
  response.code.to_i
end

# Test cases
class TestPostPerson < Test::Unit::TestCase
  # Test full request
  def test_full_request
    params = { id: 123, name: 'Bob Miller', age: 40, date: Time.now.to_i, location: 'Alaska' }
    assert_equal(201, post_person(params))
  end

  # Test partial request
  def test_partial_request
    params = { id: 124, name: 'Bill Stephenson', age: 34 }
    assert_equal(201, post_person(params))
  end

  # Test if request has missing name
  def test_missing_name
    params = { id: 125, age: 23 }
    assert_equal(400, post_person(params))
  end

  def test_missing_id
    params = {name: "Stephen Michael", age: 10}
    assert_equal(400, post_person(params))
  end

  
  def test_negative_age
    params = {id: 126, name: "Sarah Steinbeck", age: -2}
    assert_equal(400, post_person(params))
  end
  
end
