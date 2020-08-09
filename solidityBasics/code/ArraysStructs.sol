pragma solidity ^0.5.0;

contract ArraysStructs {
    Person[] public people;

    struct Person {
        string _firstName;
        string _lastName;
        uint32 age;
    }

    function addPerson(string memory _firstName, string memory _lastName, uint32 age) public {
        people.push(Person(_firstName, _lastName, age));
    }

    function sumAge() public {
        for (uint32 i=0; i < people.length; i++) {
            people[i].age++;
        }
    }

    function getCount() public view returns (uint256) {
        return people.length;
    }
}
