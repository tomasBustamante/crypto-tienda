contract Counter {
    uint256 public count;

     constructor(uint256 startValue) public {
        count = startValue;
    }

    // Getter to get the count value
     function getCount() public view returns (uint256) {
        return count;
    }

    function step() public;
}

contract IncrementCounter is Counter {
    constructor(uint256 startValue) Counter(startValue) public {}

    function step() public {
        count+=5;
    }
}
