INSERT INTO users (id, username, email, password) VALUES
('user1', 'u', 'u', '$2a$12$n/alyxwzdQv2orZ11vzD9utzg2V5OBU08hciBnnCGfyfTsRHc0fxq'),
('admin1', 'a', 'a', '$2a$12$TmdZUedG.99UAIwMYZFk7OjEA.JF1Wop2FcZwe45.doK/MpQ29KJa');

INSERT INTO roles (id, name) VALUES
(1, 'ADMIN'),
(2, 'USER');

INSERT INTO user_roles (user_id, role_id) VALUES
('user1', 2),
('admin1', 1);


INSERT INTO problems (id, title, description, difficulty, template)
VALUES
    ('find_the_first_element', 'Find the first element', 'Given a list of integers, the task is to get the first element of the list.', 'Easy', 'class Solution {\n    public int findFirst(List<Integer> nums){\n        \n    }\n}'),
    ('find_duplicate_elements', 'Find duplicate elements', 'Given a list containing some integers, the task is to find the duplicate elements in this list.', 'Medium', 'class Solution {\n    public List<Integer> findDuplicates(List<Integer> nums){\n        \n    }\n}'),
    ('count_occurrence_of_a_given_character', 'Count occurrence of a given character', 'Given a string and a character, the task is to make a function which counts the occurrence of the given character in the string using Stream API.', 'Easy', 'class Solution {\n    public String countOccurance(String s, char c){\n        \n    }\n}'),
    ('find_the_maximum_value_in_an_array', 'Find the Maximum Value in an Array', 'Given an integer array nums, return the maximum value from the array.', 'Easy', 'class Solution {\n    public int findMax(int[] nums){\n        \n    }\n}'),
    ('sum_of_all_elements_in_an_array', 'Sum of All Elements in an Array', 'Given an integer array nums, return the sum of all elements.', 'Easy', 'class Solution {\n    public int sumArray(int[] nums){\n        \n    }\n}'),
    ('count_even_numbers_in_an_array', 'Count Even Numbers in an Array', 'Given an integer array nums, return the count of even numbers.', 'Easy', 'class Solution {\n    public int countEvens(int[] nums){\n        \n    }\n}'),
    ('check_if_all_elements_are_positive', 'Check if All Elements Are Positive', 'Given an integer array nums, return true if all elements are positive, otherwise return false.', 'Easy', 'class Solution {\n    public boolean areAllPositive(int[] nums){\n        \n    }\n}'),
    ('find_first_positive_number', 'Find First Positive Number', 'Given an integer array nums, return the first positive number found in the array. If no positive number is found, return -1.', 'Easy', 'class Solution {\n    public int findFirstPositive(int[] nums){\n        \n    }\n}'),
    ('find_the_minimum_value_in_an_array', 'Find the Minimum Value in an Array', 'Given an integer array nums, return the minimum value from the array.', 'Easy', 'class Solution {\n    public int findMin(int[] nums){\n        \n    }\n}'),
    ('group_anagrams', 'Group Anagrams', 'Given an array of strings, group the anagrams together. Two strings are considered anagrams if they contain the same characters in any order. Return a list of lists, where each list contains all the anagrams from the input array.', 'Medium', 'class Solution {\n    public List<List<String>> groupAnagrams(String[] strs){\n        \n    }\n}'),
    ('find_the_top_k_frequent_elements', 'Find the Top K Frequent Elements', 'Given an integer array nums and an integer k, return the k most frequent elements.', 'Hard', 'class Solution {\n    public List<Integer> topKFrequent(int[] nums){\n        \n    }\n}'),
    ('find_the_intersection_of_two_arrays', 'Find the Intersection of Two Arrays', 'Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique.', 'Hard', 'class Solution {\n    public int[] intersection(int[] nums1, int[] nums2) {\n        \n    }\n}'),
    ('find_the_missing_number_in_an_array', 'Find the Missing Number in an Array', 'Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.', 'Medium', 'class Solution {\n    public int findMissingNumber(int[] nums) {\n        \n    }\n}'),
    ('two_sum', 'Two Sum', 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.', 'Hard', 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}');



INSERT INTO problem_examples (id, problem_id, test_input, test_output)
VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'find_the_first_element', '[1, 2, 3, 4, 5, 6, 7]', '1'),
    ('550e8400-e29b-41d4-a716-446655440001', 'find_the_first_element', '[6, 6, 6, 2, 3]', '6'),
    ('550e8400-e29b-41d4-a716-446655440002', 'find_duplicate_elements', '[5, 13, 4, 21, 13, 27, 2, 59, 59, 34]', '[59, 13]'),
    ('550e8400-e29b-41d4-a716-446655440003', 'find_duplicate_elements', '[5, 13, 4, 21, 27, 2, 59, 34]', '[]'),
    ('550e8400-e29b-41d4-a716-446655440004', 'count_occurrence_of_a_given_character', 'str = "java streams", c = \'s\'', '2'),
    ('550e8400-e29b-41d4-a716-446655440005', 'count_occurrence_of_a_given_character', 'str = "abcdabcdaaa", c = \'a\'', '5'),
    ('550e8400-e29b-41d4-a716-446655440006', 'find_the_maximum_value_in_an_array', '[3, 5, 7, 2, 8, 6]', '8'),
    ('550e8400-e29b-41d4-a716-446655440007', 'find_the_maximum_value_in_an_array', '[0, 0, 0, 1]', '1'),
    ('550e8400-e29b-41d4-a716-446655440008', 'sum_of_all_elements_in_an_array', '[1, 2, 3, 4, 5]', '15'),
    ('550e8400-e29b-41d4-a716-446655440009', 'sum_of_all_elements_in_an_array', '[7, 7, 7]', '21'),
    ('550e8400-e29b-41d4-a716-44665544000a', 'count_even_numbers_in_an_array', '[1, 2, 3, 4, 5, 6]', '3'),
    ('550e8400-e29b-41d4-a716-44665544000b', 'count_even_numbers_in_an_array', '[1, 3, 7]', '0'),
    ('550e8400-e29b-41d4-a716-44665544000c', 'check_if_all_elements_are_positive', '[1, 2, 3, 4, 5]', 'true'),
    ('550e8400-e29b-41d4-a716-44665544000d', 'check_if_all_elements_are_positive', '[1, -2000, 7]', 'false'),
    ('550e8400-e29b-41d4-a716-44665544000e', 'find_first_positive_number', '[-1, -2, 3, 4, -5]', '3'),
    ('550e8400-e29b-41d4-a716-44665544000f', 'find_first_positive_number', '[-5, -2, -4]', '-1'),
    ('550e8400-e29b-41d4-a716-446655440010', 'find_the_minimum_value_in_an_array', '[3, 5, 7, 2, 8, 6]', '2'),
    ('550e8400-e29b-41d4-a716-446655440011', 'find_the_minimum_value_in_an_array', '[100, -2, -4]', '-4'),
    ('550e8400-e29b-41d4-a716-446655440012', 'group_anagrams', '[\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]', '[["ate", "eat", "tea"],["nat", "tan"],["bat"]]'),
    ('550e8400-e29b-41d4-a716-446655440013', 'group_anagrams', '[\"aa\", \"ab\", \"ba\"]', '[["ab", "ba"]]'),
    ('550e8400-e29b-41d4-a716-446655440014', 'find_the_top_k_frequent_elements', 'nums = [1, 1, 1, 2, 2, 3], k = 2', '[1, 2]'),
    ('550e8400-e29b-41d4-a716-446655440015', 'find_the_top_k_frequent_elements', 'nums = [2, 4, 4, 4, 3], k = 1', '[4]'),
    ('550e8400-e29b-41d4-a716-446655440016', 'find_the_intersection_of_two_arrays', 'nums1 = [1, 2, 2, 1], nums2 = [2, 2]', '[2]'),
    ('550e8400-e29b-41d4-a716-446655440017', 'find_the_intersection_of_two_arrays', 'nums1 = [2, 4, 4, 4, 3], nums2 = [7, 6]', '[]'),
    ('550e8400-e29b-41d4-a716-446655440018', 'find_the_missing_number_in_an_array', '[3, 0, 1]', '2'),
    ('550e8400-e29b-41d4-a716-446655440019', 'find_the_missing_number_in_an_array', '[2, 1, 5, 0, 3]', '4'),
    ('550e8400-e29b-41d4-a716-44665544001a', 'two_sum', 'nums = [2,7,11,15], target = 9', '[0,1]'),
    ('550e8400-e29b-41d4-a716-44665544001b', 'two_sum', 'nums = [3,2,4], target = 6', '[1,2]');
