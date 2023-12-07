/**
 * Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.

Consider the number of elements in nums which are not equal to val be k, to get accepted, you need to do the following things:

Change the array nums such that the first k elements of nums contain the elements which are not equal to val. The remaining elements of nums are not important as well as the size of nums.
Return k.
 */
// solution approach one using splice delete operation
function removeElement1(nums: number[], val: number): number {
    while (nums.indexOf(val) !== -1) {
        nums.splice(nums.indexOf(val), 1);
    }
    console.log(nums);
    return nums.length;
};

//solution approach 2 using two pointers
function removeElement2(nums: number[], val: number): number {
    let uniqueNum = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== val) {
            nums[uniqueNum] = nums[i];
            uniqueNum++;
        }
    }
    console.log('updated array is' ,nums);
    console.log('expected result ' , nums.slice(0, uniqueNum));
    
    return uniqueNum;
};

// using delete operation
function removeElement3(nums: number[], val: number): number {
    while (nums.includes(val)) {
        delete nums[nums.indexOf(val)];
    }
    nums.sort();
    return nums.flat().length;
};

export function executeRemoveElement() {
    const nums: number[] = [0, 1, 2, 2, 3, 0, 4, 2]; //[3, 2, 2, 3]; // Input array 
    const val: number = 2; //3; // Value to remove 
    // The expected answer with correct length. It is sorted with no values equaling val.
    const expectedNums: number[] = [0, 0, 1, 3, 4];// [2, 2]; // 

    console.time('logtime');
    const k = removeElement(nums, val); // Calls your implementation
    console.timeEnd('logtime');

    console.assert(k == expectedNums.length, 'expected array length did not match k');

   const sortedNums = nums.slice(0, k).sort();// Sort the first k elements of nums
   const sortedExpected = expectedNums.slice(0, k).sort();// Sort the first k elements of nums
   console.log('sortedNums ', sortedNums);
   console.log('sortedExpected ' , sortedExpected);

    for (let i = 0; i < k; i++) {
        console.assert(sortedNums[i] == sortedExpected[i], 'nums i did not match expected nums i');
    }
}


function removeElement(nums: number[], val: number): number {
    while (nums.includes(val)) {
        nums.splice(nums.indexOf(val), 1);
    }
    return nums.length;
}

function removeElement4(nums: number[], val: number): number {
    while (nums.indexOf(val) !== -1) {
        nums.splice(nums.indexOf(val), 1);
    }
    console.log(nums);
    return nums.length;
};

//executeRemoveElement();
