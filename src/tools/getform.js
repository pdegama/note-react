const GetField = (e) => {
  // if get field value in the form and in element
  const p = (e) => [...e.target.elements]
    .filter((ele) => ele.type !== "submit")
    .map((ele) => {
      return {
        [ele.getAttribute("name")]: ele.type === "file" ? ele.files : ele.value,
      };
    });
  let l = {};
  let v = p(e);
  for (const i in v) {
    let j = v[i];
    for (const i in j) {
      l[i] = j[i]
    }
  }
  return l;
}

export { GetField }
