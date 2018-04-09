function byState(str) {
  console.log(str)
  let peopleObj = [];
  let stateFilter = [];
  let result = "";
  const states = {
    'AZ': 'Arizona',
    'CA': 'California',
    'ID': 'Idaho',
    'IN': 'Indiana',
    'MA': 'Massachusetts',
    'OK': 'Oklahoma',
    'PA': 'Pennsylvania',
    'VA': 'Virginia'
  }
  const reg = /[\n,]/g;
  let people = str.split(reg);
  if(people[people.length-1] === ""){
    people.pop()
  }
  
  console.log(people)
  for(let i = 0; i < people.length; (i += 3)) {
  console.log("made it here " + i); 
    if(i > people.length) {
      break;
    } else {
      let temp = people[i + 2].split(' ');
      console.log(temp)
      let state = temp.pop();
      if(!stateFilter.includes(state)) {
        stateFilter.push(state);
      }
      let personObj = {
        name: people[i].trim(),
        street: people[i+1].trim(),
        city: temp.join(' ').trim(),
        state: states[state].trim()
      }
      peopleObj.push(personObj);
    }
  }
  // console.log(peopleObj);
  // console.log(stateFilter);
  peopleObj.sort((a,b) => {
    let nameA = a.name;
  	let nameB = b.name;
  	if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    if (nameA === nameB) {
      let tempA = a.street.split('');
      let numA = tempA[1];
      let tempB = b.street.split('');
      let numB = tempB[1];
      if (numA < numB) {
        return -1;
      }
      if (numA > numB) {
        return 1;
      }
    }
    return 0;
  })
  stateFilter.sort((a,b) => {
    let nameA = states[a];
  	let nameB = states[b];
  	if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  })
  
  
    let lastState = stateFilter.slice(stateFilter.length-1, stateFilter.length);
    console.log(lastState)
  stateFilter.forEach(state => {
    let temp = peopleObj.filter(person => person.state === states[state]);
    //result += states[state] + "/r/n..... " + 
    //console.log(state)
    result += states[state];
    for(let i = 0; i < temp.length; i++){
    if(i + 1 === temp.length && states[state] === states[lastState]){
        result += "\r\n..... " + temp[i].name + " " + temp[i].street + " " + temp[i].city + " " + temp[i].state;  
      } else if(i + 1 === temp.length){
        result += "\r\n..... " + temp[i].name + " " + temp[i].street + " " + temp[i].city + " " + temp[i].state + "\r\n ";  
      } else {
        result += "\r\n..... " + temp[i].name + " " + temp[i].street + " " + temp[i].city + " " + temp[i].state;
      }
    }
    
  })
  console.log(result)
  return result;
}