/**
 * Given an integer array nums of length n, you want to create an array ans of length 2n where ans[i] == nums[i] and ans[i + n] == nums[i] for 0 <= i < n (0-indexed).

Specifically, ans is the concatenation of two nums arrays.

Return the array ans.
 */
function getConcatenation1(nums: number[]): number[] {
    return [...nums, ...nums]
};

function getConcatenation(nums: number[]): number[] {
    const ans = [];
    const n = nums.length;
    for(let i=0 ; i < n; i++){
        ans[i] = nums[i];
        ans[i+n] = nums[i];
    }

    return ans;
};

export function executeGetConcatenation(){
    const input =[1,3,2,1]; //[1,2,1]; //
    const expectedOutput = [1,3,2,1,1,3,2,1]; //[1,2,1,1,2,1]; //
    const result = getConcatenation(input);
    console.assert(expectedOutput.length === result.length, 'arrays size did not match');
    for(let i = 0 ; i< result.length ; i++){
        console.assert(expectedOutput[i] === result[i], `element at${i} did not match` )
    }
}