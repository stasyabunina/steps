import "../App.css";
import { useState } from 'react';
import data from "../data/data";
import WorkoutList from "./WorkoutList";
import { v4 as uuidv4 } from 'uuid';


function WorkoutForm() {
    const [form, setForm] = useState({
        id: uuidv4(),
        date: '',
        distance: '',
    });
    const [dateError, setDateError] = useState(false);
    const [workoutList, setWorkoutList] = useState(data);

    const onSubmit = (e) => {
        e.preventDefault();

        if (isDateValid(form.date) === false) {
            setDateError(true);
            return;
        }

        checkDate();
        sortList();
        setWorkoutList(workoutList);

        setForm({
            id: uuidv4(),
            date: '',
            distance: '',
        });
        setDateError(false);
    }

    const onValueChange = (e) => {
        const value = /^[0-9]{1,2}([,.][0-9]{1,2})?$/.test(e.target.value) ? Number(e.target.value) : e.target.value;
        setForm((prevForm) => ({ ...prevForm, [e.target.name]: value }));
    }

    const checkDate = () => {
        for (const item of workoutList) {
            if (item.date === form.date) {
                item.distance += form.distance;
                return;
            }
        }

        workoutList.push(form);
    }

    const sortList = () => {
        workoutList.sort(function (a, b) {
            let aa = a.date.split('.').reverse().join(),
                bb = b.date.split('.').reverse().join();
            return aa > bb ? -1 : (aa < bb ? 1 : 0);
        });
    }

    const isDateValid = (date) => {
        if (/^(0[1-9]|[12]\d|3[01]).(0[1-9]|1[0-2]).[12]\d{3}$/.test(date.match(/^\d{2}\.\d{2}\.\d{4}$/))) {
            return true;
        }
        return false;
    }

    const onDeleteItem = (item) => {
        setWorkoutList((prevWorkoutList) => prevWorkoutList.filter(prevItem => prevItem.id !== item.id));
    }

    const onEditItem = (item) => {
        setForm({
            id: item.id,
            date: item.date,
            distance: item.distance,
        });

        setWorkoutList((prevWorkoutList) => prevWorkoutList.filter(prevItem => prevItem.id !== item.id));
    }

    return (
        <main className="widget">
            <div className="container">
                <form className="form" onSubmit={onSubmit}>
                    <label className="label">
                        <span className="label-text">Дата (ДД.ММ.ГГГГ)</span>
                        <input className="input" name="date" type="text" value={form.date} onChange={onValueChange}
                            placeholder="ДД.ММ.ГГГГ" required />
                    </label>
                    <label className="label">
                        <span className="label-text">Пройдено км</span>
                        <input className="input" name="distance" type="number" value={form.distance} onChange={onValueChange}
                            placeholder="0.0 км" min="1" max="100" step="0.1" required />
                    </label>
                    <button className="submit">OK</button>
                </form>
                {dateError ? <span className="error">Дата должна совпадать формату ДД.ММ.ГГГГ</span> : <></>}
                {data.length === 0 ? <></> : <WorkoutList items={workoutList} onDeleteItem={onDeleteItem}
                    onEditItem={onEditItem} />}
            </div>
        </main>
    );
}

export default WorkoutForm;