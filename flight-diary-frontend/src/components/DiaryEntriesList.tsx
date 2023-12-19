import { useState, useEffect } from "react";
import { getAllEntries } from '../services/diaries';
import { DiaryEntry } from '../types'

const DiaryEntriesList = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      const diaryEntries = await getAllEntries();
      setDiaryEntries(diaryEntries);
    };
    void fetchDiaryEntries();
  }, []);

   return (
    <div>
      <h2>Diary Entries</h2>
      {diaryEntries.map(diaryEntry =>
        <div key={diaryEntry.id}> 
          <h3>{diaryEntry.date}</h3>
          <p>visibility: {diaryEntry.visibility}</p>
          <p>weather: {diaryEntry.weather}</p>
        </div>
      )}
    </div>
  )

}


export default DiaryEntriesList;