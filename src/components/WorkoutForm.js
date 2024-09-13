import '../App.css';
import { useState, useEffect } from 'react';
import WorkoutList from './WorkoutList';
import { v4 as uuidv4 } from 'uuid';

function WorkoutForm() {
    const [form, setForm] = useState({
        id: uuidv4(),
        date: '',
        distance: '',
    });
    const [dateError, setDateError] = useState(false);
    const [workoutList, setWorkoutList] = useState([]);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('items')) || [];
        setWorkoutList(storedItems);
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        if (isDateValid(form.date) === false) {
            setDateError(true);
            return;
        }

        setDateError(false);
        checkDate();
        setWorkoutList((prevList) => {
            const newList = [...prevList];
            sortList(newList);
            localStorage.setItem('items', JSON.stringify(newList))
            return newList;
        });

        setForm({
            id: uuidv4(),
            date: '',
            distance: '',
        });
    };

    const onValueChange = (e) => {
        setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
    }

    const checkDate = () => {
        let found = false;
        setWorkoutList((prevList) => {
            const newList = [...prevList];
            for (const item of newList) {
                if (item.date === form.date) {
                    item.distance += form.distance;
                    found = true;
                    break;
                }
            }
            if (!found) {
                newList.push(form);
            }
            return newList;
        });
    };

    const sortList = (list) => {
        list.sort((a, b) => {
            let aa = a.date.split('.').reverse().join(),
                bb = b.date.split('.').reverse().join();
            return aa > bb ? -1 : (aa < bb ? 1 : 0);
        });
    };

    const isDateValid = (date) => {
        if (/^(0[1-9]|[12]\d|3[01]).(0[1-9]|1[0-2]).[12]\d{3}$/.test(date.match(/^\d{2}\.\d{2}\.\d{4}$/))) {
            return true;
        }
        return false;
    }

    const onDeleteItem = (item) => {
        setWorkoutList((prevWorkoutList) => {
            const newList = prevWorkoutList.filter(prevItem => prevItem.id !== item.id);
            localStorage.setItem('items', JSON.stringify(newList))
            return newList;
        });
    }

    const onEditItem = (item) => {
        setForm({
            id: item.id,
            date: item.date,
            distance: item.distance,
        });

        setWorkoutList((prevWorkoutList) => {
            const newList = prevWorkoutList.filter(prevItem => prevItem.id !== item.id);
            localStorage.setItem('items', JSON.stringify(newList))
            return newList;
        });
    }

    return (
        <main className='widget'>
            <div className='container'>
                <form className='form' onSubmit={onSubmit}>
                    <label className='label'>
                        <span className='label-text'>Дата (ДД.ММ.ГГГГ)</span>
                        <input className='input' name='date' type='text' value={form.date} onChange={onValueChange}
                            placeholder='ДД.ММ.ГГГГ' required />
                    </label>
                    <label className='label'>
                        <span className='label-text'>Пройдено км</span>
                        <input className='input' name='distance' type='number' value={form.distance} onChange={onValueChange}
                            placeholder='0.0 км' min='0.1' max='100' step='0.1' required />
                    </label>
                    <button className='submit'>OK</button>
                </form>
                {dateError ? <span className='error'>Дата должна совпадать формату ДД.ММ.ГГГГ</span> : <></>}
                {workoutList.length === 0 ? <span>Пусто.</span> : <WorkoutList items={workoutList} onDeleteItem={onDeleteItem}
                    onEditItem={onEditItem} />}
            </div>
        </main>
    );
}

export default WorkoutForm;