import { ListNode, nodeToString, stringToListNode } from "./utils"
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
/**
 * Given the head of a singly linked list, reverse the list, and return the reversed list. 
 * 
 * example 1
 * Input: head = [1,2,3,4,5]
 * Output: [5,4,3,2,1]
 * 
 * example 2
 * Input: head = [1,2]
 * Output: [2,1]
 * 
 * Example 3:
 * Input: head = []
 * Output: []
 * 
 */


function reverseListiteratve(head: ListNode | null): ListNode | null {
    let current = head;
    let nextCurrent = null;
    let previous = null;

    while (current !== null) {
        nextCurrent = current.next;
        current.next = previous;
        previous = current;
        current = nextCurrent;
    }
    return previous
};

export function executeReverseList() {
    const input = "[1,2,3,4,5]";
    const output = "[5,4,3,2,1]";
    const head = stringToListNode(input);
    const resultNode = reverseListiteratve(head);
    const result = nodeToString(resultNode)
    console.assert(output === result, 'output did not match the expected');
}

executeReverseList()
