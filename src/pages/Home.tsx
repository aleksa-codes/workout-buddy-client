import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
  // const [workouts, setWorkouts] = useState([]);
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchExercises = async () => {
      const res = await fetch(
        'https://workout-buddy-api-lrpg.onrender.com/api/workouts'
      );
      const data = await res.json();

      if (res.ok) {
        // setWorkouts(data);
        dispatch({ type: 'SET_WORKOUTS', payload: data });
      }
    };
    fetchExercises();
  }, [dispatch]);

  return (
    <div className='home'>
      <div className='workouts'>
        {workouts.map((workout: any) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
