import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState<string>('');
  const [load, setLoad] = useState<string>('');
  const [reps, setReps] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const workout = { title, load, reps };

    const res = await fetch(
      'https://workout-buddy-api-lrpg.onrender.com/api/workouts',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workout)
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setEmptyFields(data.emptyFields);
    } else {
      setTitle('');
      setLoad('');
      setReps('');
      setError('');
      setEmptyFields([]);
      dispatch({ type: 'CREATE_WORKOUT', payload: data.workout });
    }
  };

  return (
    <div className='form-div'>
      <form className='create' onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>
        <label>Exercise Title:</label>
        <input
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes('title') ? 'error' : ''}
        />
        <label>Load (kg):</label>
        <input
          type='number'
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={emptyFields.includes('load') ? 'error' : ''}
        />
        <label>Reps:</label>
        <input
          type='number'
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={emptyFields.includes('reps') ? 'error' : ''}
        />
        <button>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-plus'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <line x1='12' y1='5' x2='12' y2='19' />
            <line x1='5' y1='12' x2='19' y2='12' />
          </svg>{' '}
          Add Workout
        </button>
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  );
};

export default WorkoutForm;
