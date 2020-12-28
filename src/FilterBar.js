import { useCallback, useEffect, useMemo, useState } from "react";

import Button from './Button';

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


const FilterBar = ({ setFilters, filters, }) => {
    const initialFilters = useMemo(() => ({
        viewAll: true,
        usersPosts: null,
        published: null,
    }), []);
    
    const [settings, setSettings] = useState(initialFilters);

    const resetSettings = useCallback(
        () => setSettings(initialFilters)
        ,[initialFilters]
    )

    useEffect(() => {
        setFilters(settings);
    }, [settings, setFilters])

    return (
        <div className='filter-bar'>
            {buttons.map((button, i) => (
                <Button {...{button}} {...{resetSettings}} {...{setSettings}} {...{filters}} key={i}/>
            ))}
        </div>
    )
}

export default FilterBar