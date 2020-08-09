pragma solidity ^0.5.0;

contract Enums {
    enum ActionChoices { GoLeft, GoRight }
    ActionChoices choice;

    function setGoLeft() public {
        choice = ActionChoices.GoLeft;
    }

    function setGoRight() public {
        choice = ActionChoices.GoRight;
    }

    function getChoice() public view returns (ActionChoices) {
        return choice;
    }
}
