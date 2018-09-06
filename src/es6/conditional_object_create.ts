//How to conditionally build an object in JavaScript with ES6 refer : https://medium.freecodecamp.org/how-to-conditionally-build-an-object-in-javascript-with-es6-e2c49022c448

/**
 * Problem Statement - Create an object from existing object
 * when all fields are not populated all the time (some are optional )
 * and you need to return back only the fields that have values
 *
 */

/**
 *  Solution 1 - using older JS approach
 */
function OlderApproach(data) {
    const {
        id,
        title,
        description,
        optionalField,
        anotherOptionalField,
    } = data;
    const parsedEpisode: any = { guid: id, title, summary: description };
    if (optionalField) {
        parsedEpisode.optionalField = optionalField;
    } else if (anotherOptionalField) {
        parsedEpisode.anotherOptionalField = anotherOptionalField;
    }
    // and so on
    return parsedEpisode;
}

/**
 * solution 2 using ES6 Destructing example
 */
function conditionalDestructuring({       // parameter object destructuring,
    id,
    title,
    description = 'test description',
    optionalField,
    anotherOptionalField,
}) {
    return {
        guid: id,
       // ...title,         //this will spread the value
        ...{newTitle: title , withNewVar : "newtitle with new var"},    //this will spread the object
        ...({title , addNew: "newly added data"}),
        summary: description,
        ...(
            optionalField && { optionalField }   //It is used to “unwrap” the object if the condition is true-ish (that’s what the && are for):
        ),
        ...(
            anotherOptionalField && { anotherOptionalField }
        ),
    };
}

const testData1 = {
    id: 1,
    title: 'Test Data1 Title1',
    description: 'Test Data1 Title1',
    optionalField: 'test data1 optional Field',
    anotherOptionalField: 'test data1 another optional field',
};

//console.log('from older approach :', OlderApproach(testData1));
console.log('from newer approach : ', conditionalDestructuring(testData1));