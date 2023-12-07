export class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}
export function stringToNumberArray(input: string): number[] {
    const givenStr = input.trim().substring(1, input.length -1);
    if (givenStr.length === 0) {
        return [];
    }
    const parts = givenStr.split(',');
    const output = parts.map(part => parseInt(part.trim()));
    console.log('input as int array ', output);
    return output;
}

export function stringToListNode(input: string) : ListNode {
    const nodeValues = stringToNumberArray(input);
    let current : ListNode;
    const dummyNode = new ListNode(0);
    current = dummyNode;
    nodeValues.map(val => {
        current.next = new ListNode(val);
        current = current.next;
    })
    console.log('head ' , dummyNode.next);
    return dummyNode.next;
}

export function nodeToString(node: ListNode) : string {
    if(node == null){
        return "[]";
    }
    let result: string = "";
    while (node != null) {
        result = `${result}${node.val},`;
        node = node.next;
    }
    console.log('node to str ' , `[${result.substring(0, result.length -1)}]`);
    return `[${result.substring(0, result.length -1)}]`;
}