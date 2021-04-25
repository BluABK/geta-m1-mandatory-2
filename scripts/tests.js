QUnit.test("Choose an arbitrary bar and check that it gets un-chosen when chosen again.", function (assert) {
    // Choose an arbitrary bar and check that it gets un-chosen when chosen again.
    assert.notEqual(chosenBar, 2, "Bar #2 is not currently the chosen one.")

    // Choose Bar #2.
    chooseBar(2);
    assert.equal(chosenBar, 2, "Choose bar #2 and it is now the chosen one.")

    // Un-choose Bar #2.
    chooseBar(2);
    assert.notEqual(chosenBar, 2, "Choose (already chosen) bar #2 and it is no longer the chosen one.")
});

QUnit.test("Choose an arbitrary bar and check that the chosen one changes when a different arbitrary bar is chosen.", function (assert) {
    // Choose an arbitrary bar and check that it gets un-chosen when chosen again.
    assert.notEqual(chosenBar, 2, "Bar #2 is not currently the chosen one.")

    // Choose Bar #2.
    chooseBar(2);
    assert.equal(chosenBar, 2, "Choose bar #2 and it is now the chosen one.")

    // Un-choose Bar #2.
    chooseBar(3);
    assert.notEqual(chosenBar, 2, "Choose bar #3 and bar #2 is no longer the chosen one.")

    // Check that bar #3 was chosen.
    assert.equal(chosenBar, 3, "Bar #3 is now the chosen one.")
});

QUnit.test("FIXME: Modify bar.", function (assert) {
    let FIXME = null;

    assert.notEqual(FIXME, null);
});

QUnit.test("FIXME: Modify bar.", function (assert) {
    let FIXME = null;

    assert.notEqual(FIXME, null);
});

QUnit.test("FIXME: Add bar.", function (assert) {
    let FIXME = null;

    assert.notEqual(FIXME, null);
});