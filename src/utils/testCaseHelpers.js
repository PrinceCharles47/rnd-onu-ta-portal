export function findTestRequisite(allTestCases, testCase) {
  // will look for the incomplete and required test case that is nearest to the 'testCase' prop.
  const index = allTestCases.indexOf(testCase);
  const requisite = allTestCases
    .slice(0, index)
    .reverse()
    .find((t) => t.required);

  // will return 'undefined' if found none.
  return requisite;
}

export function withCompleteStatus(item) {
  return item && item.status === "complete";
}
