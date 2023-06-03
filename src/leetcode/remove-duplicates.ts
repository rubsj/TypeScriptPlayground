/**
 * Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique
 *  element appears only once. The relative order of the elements should be kept the same. 
 * Then return the number of unique elements in nums.
 *  Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:

Change the array nums such that the first k elements of nums contain the unique elements in the order they were present 
in nums initially. The remaining elements of nums are not important as well as the size of nums.
Return k.
 */
/**
 * my original solution : 
 * I made mistake of moving every element in array , doing so increases time cmplexity to o(n*n)
 * */
function removeDuplicates1(nums: number[]): number {
    let uniqueLength = 0;
    while(nums[uniqueLength] < 1000){
        if(nums[uniqueLength] === nums[uniqueLength+1]){
            for (let j = uniqueLength+1; j < nums.length - 1; j++) {
                nums[j] = nums[j + 1]
            }
            nums[nums.length - 1] = 1000;
        }else{
            uniqueLength++;
        }

    }
   
    console.log('nums at the end is ', nums);
    console.log('unique count is ' , uniqueLength);
    return uniqueLength;
};


/**
 * this two pointer solution is best.
 * BElow are the hints given in question
 * 1. In this problem, the key point to focus on is the input array being sorted. As far as duplicate elements are concerned, what is their positioning in the array when the given array is sorted? Look at the image above for the answer. If we know the position of one of the elements, do we also know the positioning of all the duplicate elements?
 * 2.We need to modify the array in-place and the size of the final array would potentially be smaller than the size of the input array. So, we ought to use a two-pointer approach here. One, that would keep track of the current element in the original array and another one for just the unique elements.
 * 3. Essentially, once an element is encountered, you simply need to bypass its duplicates and move on to the next unique element.
 * 
 */
const removeDuplicates = (nums: number[]): number => {
    let k: number = 1;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1]) {
            nums[k] = nums[i];
            k++;
        }
    }

    return k;
};

export function executeRemoveDuplicates() {
    const nums: number[] = [0,0,1,1,1,2,2,3,3,4];  // [1, 1, 2]; //  Input array
    const expectedNums: number[] = [0,1,2,3,4]; //  [1, 2]; // The expected answer with correct length

    const k = removeDuplicates(nums); // Calls your implementation

    console.assert(k === expectedNums.length, 'length match assertion failed');

    for (let i = 0; i < k; i++) {
        console.assert(nums[i] == expectedNums[i] , 'array element assertion failed');
    }
}

