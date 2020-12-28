import { useCycle } from "framer-motion";
import { useEffect, useState } from "react";

const buttons = [
    {
        states: [
            'view all',
            'hide'
        ],
        filter: 'viewAll',
    },
    {
        states: [
            'your posts',
            'others posts'
        ],
        filter: 'usersPosts',
    },
    {
        states: [
            'published',
            'unpublished'
        ],
        filter: 'published'
    }
];

const buttonColors = ['blue', 'green'];


const Button = ({ button, filters, setSettings, resetSettings, }) => {
    const [color, cycleColor] = useCycle(buttonColors);
    const [buttonState, setButtonState] = useCycle(button.states);

    return (
        <button 
            onClick={() => {
                cycleColor();
                setButtonState();
                if (buttonState === 'view all') {
                    resetSettings();
                } else {
                    setSettings({...filters, [button.filter]: !filters[button.filter]});
                }
            }}
            style={{ backgroundColor: color }}
        >{buttonState}</button>
    )
}


const FilterBar = ({ setFilter, posts, }) => {
    const initialFilters = {
        viewAll: true,
        usersPosts: null,
        published: null,
    };
    const [settings, setSettings] = useState(initialFilters);

    const resetSettings = () => setSettings(initialFilters);

    useEffect(() => {
        setFilter(settings);
    }, [settings, setFilter])

    return (
        <div className='filter-bar'>
            {buttons.map(button => (
                <Button {...button} {...resetSettings}/>
            ))}
        </div>
    )
}

export default FilterBar