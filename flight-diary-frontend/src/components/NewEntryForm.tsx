import { useState } from 'react';
import { Weather, Visibility, NewDiaryEntry } from '../types';
import { createEntry } from '../services/diaries';
import axios from 'axios';

const NewEntryForm = () => {
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState<string> ('');
  const [error, setError] = useState<string>('')
  const [diaryEntries, setDiaryEntries] = useState<NewDiaryEntry[]>([])

  const handleVisibilityChange = (value: Visibility) => {
    setVisibility(value);
  };

  const addEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    
    const newEntry: NewDiaryEntry = {
      date,
      visibility,
      weather,
      comment
    };

    try {
      await createEntry(newEntry);
      setDiaryEntries(diaryEntries.concat(newEntry));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data && typeof error.response?.data === 'string'){
          setError(error.response.data);
          clearError();
        }
        else {
          setError('Error: Axios Error')
          clearError();
        }
      } else {
        setError('Error: unable to save diary')
        clearError();
      }
    }
  };

  const clearError = () => {
    setTimeout(() => {
      setError('');
    }, 5000);
  }

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
      <h2>Add new entry</h2>
      <form onSubmit={addEntry}>
        <div>
          date{' '}
          <input
            type='date'
            value={date}
            onChange={({target}) => setDate(target.value)}/>
        </div>
        <div>
          visibility&nbsp;&nbsp;&nbsp;
          {Object.values(Visibility).map((option) => (
            <label key={option}>
              {option}
              <input
                type='radio'
                value={option}
                checked={visibility === option}
                onChange={() => handleVisibilityChange(option)}
                style={{ marginLeft: '10px' }}
              />
            </label>
          ))}
        </div>
        <div>
          weather&nbsp;&nbsp;&nbsp;
          {Object.values(Weather).map((option) => (
            <label key={option}>
              {option}
              <input
                type='radio'
                value={option}
                checked={weather === option}
                onChange={() => setWeather(option)}
              />
            </label>
          ))}
        </div>
        <div>
          comment <input value={comment}
          onChange={({target}) => setComment(target.value)}/>
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
  );
};

export default NewEntryForm;