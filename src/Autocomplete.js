import './Autocomplete.css';
import {useState, useEffect, useRef} from 'react';

function Autocomplete(props) {
  const [tagList, setTagList] = useState([]);
  const [autocomplete, setAutocomplete] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tag, setTag] = useState("");
  const wrapperRef = useRef();

  useEffect(() => {
    focusSearch();
    setTagList(sortList(props.array));

    document.addEventListener('click', event => {
      const {current: wrap} = wrapperRef;
      if(wrap && !wrap.contains(event.target)) {
        hideAutocomplete(); 
        setAutocomplete([]);
      }
    });
  }, [])

  //REMOVES DUPLICATES AND SORTS AN ARRAY OF TAGS
  const sortList = (list, value) => {
    const newArray = [...list];
    if(value || tag) newArray.push(value || tag);
    return [...new Set(newArray)].sort((a, b) => a.localeCompare(b));
  }

  const focusSearch = () => {
    document.querySelector('.search-input').focus();
  }

  const hideAutocomplete = () => {
    const autocompleteClassList = document.querySelector('.box').classList;
    if(!autocompleteClassList.contains('hiden')) autocompleteClassList.add('hiden');
  }

  const unhideAutocomplete = () => {
    const autocompleteClassList = document.querySelector('.box').classList;
    if(autocompleteClassList.contains('hiden')) autocompleteClassList.remove('hiden');
  }

  const selectTag = value => {
    setSelectedTags(sortList(selectedTags, value));
    setTagList(sortList(tagList, value || tag));
    setTag('');
    setAutocomplete([]);
    focusSearch();
    // hideAutocomplete();
  }

  const deleteTag = tag => {
    setSelectedTags(selectedTags.filter(item => item !== tag));
  }

  const clearTags = () => {
    setSelectedTags([]);
    focusSearch();
  }

  const handleChange = inputValue => {
    unhideAutocomplete();
    setTag(inputValue);
    setAutocomplete(tagList.filter(item => item.startsWith(inputValue)));
  }

  const handleKeyDown = event => {
    switch(event.key) {
      case "Enter":
        handleChange(event.target.textContent);
        selectTag(event.target.textContent);
        break;
      case "ArrowDown":
        event.target.type === "search" 
        ? event.target.nextSibling?.firstChild?.focus() 
        : event.target.nextSibling?.focus();
        break;
      case "ArrowUp":
        if(event.target.type !== "search") 
          event.target.previousSibling 
          ? event.target.previousSibling.focus() 
          : focusSearch();
        break;
      default:
        break;
    }
  }

  return (
    <div className="App">
      <header className="autocomplete" ref={wrapperRef}>
        <h2>Autocomplete Component</h2>
        <div className="tags-panel">
          <div className="tags-container">
            {selectedTags.map(item => (
              <div className="tag" key={item}>
                <div>{item}</div>
                <div className="close" value={item} onClick={() => deleteTag(item)}>&#215;</div>
              </div>
            ))}
          </div>
          <div className="clear-button" onClick={() => clearTags()}>clear</div>
        </div>
        <input type="search" className="search-input" value={tag} placeholder="please type your tag..." 
          onChange={e => handleChange(e.target.value)} 
          onKeyDown={e => handleKeyDown(e)} 
          onFocus={() => unhideAutocomplete()}
        />
        <ul className="box" >
          {autocomplete.map(item => 
            <li className="item" tabIndex="0" key={item} 
              onClick={e => {selectTag(e.target.textContent);}} 
              onKeyDown={e => handleKeyDown(e)} 
              onMouseOver={e=>e.target.focus()}
            >
              {item}
            </li>
          )}
        </ul>
      </header>
    </div>
  );
}

export default Autocomplete;