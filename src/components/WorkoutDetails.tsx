import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

dayjs.extend(relativeTime);
const MySwal = withReactContent(Swal);

const WorkoutDetails = ({ workout }: any) => {
  const { dispatch } = useWorkoutsContext();

  //handleClick function that first opens a dialog box to confirm the deletion of the workout
  const handleClick = async () => {
    MySwal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this workout!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1a9c73',
      cancelButtonColor: '#C3423F',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(
          `https://workout-buddy-api-lrpg.onrender.com/api/workouts/${workout._id}`,
          {
            method: 'DELETE'
          }
        );

        const data = await res.json();

        if (!res.ok) {
          MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.error
          });
        } else {
          MySwal.fire('Deleted!', 'Your workout has been deleted.', 'success');
          dispatch({ type: 'DELETE_WORKOUT', payload: data.workout });
        }
      }
    });
  };

  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        <div className='number'>{workout.load}</div>
      </p>
      <p>
        <strong>Reps: </strong>
        <div className='number'>{workout.reps}</div>
      </p>
      <p>about {dayjs(workout.createdAt).fromNow()}</p>
      <span onClick={handleClick}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='icon icon-tabler icon-tabler-trash'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          strokeWidth='2'
          stroke='#2c3e50'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <line x1='4' y1='7' x2='20' y2='7' />
          <line x1='10' y1='11' x2='10' y2='17' />
          <line x1='14' y1='11' x2='14' y2='17' />
          <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
          <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
        </svg>
      </span>
    </div>
  );
};

export default WorkoutDetails;
