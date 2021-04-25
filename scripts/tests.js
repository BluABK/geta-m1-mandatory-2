QUnit.test("Choose an arbitrary bar and check that it gets un-chosen when chosen again.", function (assert) {
    // Choose an arbitrary bar and check that it gets un-chosen when chosen again.
    assert.notEqual(chosenBar, 2, "Bar #2 is not currently the chosen one.");

    // Choose Bar #2.
    chooseBar(2);
    assert.equal(chosenBar, 2, "Choose bar #2 and it is now the chosen one.");

    // Un-choose Bar #2.
    chooseBar(2);
    assert.notEqual(chosenBar, 2, "Choose (already chosen) bar #2 and it is no longer the chosen one.");
});

QUnit.test("Choose an arbitrary bar and check that the chosen one changes when a different arbitrary bar is chosen.", function (assert) {
    // Choose an arbitrary bar and check that it gets un-chosen when chosen again.
    assert.notEqual(chosenBar, 2, "Bar #2 is not currently the chosen one.");

    // Choose Bar #2.
    chooseBar(2);
    assert.equal(chosenBar, 2, "Choose bar #2 and it is now the chosen one.");

    // Un-choose Bar #2.
    chooseBar(3);
    assert.notEqual(chosenBar, 2, "Choose bar #3 and bar #2 is no longer the chosen one.");

    // Check that bar #3 was chosen.
    assert.equal(chosenBar, 3, "Bar #3 is now the chosen one.");
});

QUnit.test("Remove a bar.", function (assert) {
    assert.true(numbers.length >= 3, "numbers array has at least 3 items (required for this test to continue).");

    const originalLength = numbers.length;
    // NB: The actual index of a bar in numbers array is barNo - 1.
    const barValue = numbers[2];

    // Remove bar #3.
    removeBar(3);

    assert.equal(numbers.length, originalLength -1, "A bar was removed from numbers array.");
    assert.false(numbers.includes(barValue), "The removed bar was the one given as argument to removeBar.");
});

QUnit.test("Modify a bar.", function (assert) {
    assert.true(numbers.length >= 2, "numbers array has at least 2 items (required for this test to continue).");

    // NB: The actual index of a bar in numbers array is barNo - 1.
    const originalValue = numbers[1];

    // Make sure we don't change to the same value as before, thus invalidating the test.
    let newValue;
    originalValue === 5 ? newValue = 6 : newValue = 5;
    assert.notEqual(originalValue, newValue, `The new value (${newValue}) to assign bar is not the same as the original value (${originalValue}).`);

    // Change bar #2's value to 10 - originalValue
    changeBarValue(2, newValue);

    assert.equal(numbers[1], newValue, `The bar's value was changed to the given value. (${originalValue} --> ${newValue}).`);

});

QUnit.test("Add a bar.", function (assert) {
    const originalLength = numbers.length;
    const barValue = 4

    // Set inputValue for the new bar.
    inputValue = barValue;

    // Add bar
    addBar();

    assert.equal(originalLength, numbers.length -1, "A bar was added to numbers array.");
    assert.true(numbers[numbers.length -1] === barValue, "The bar was added at the end of the array.");
});