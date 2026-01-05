import React from 'react';
import { PokemonDataTable } from './pokemon-datatable';

export const ManagePokemon: React.FC = () => {
    return (
        <>
            <div className="py-2 sm:py-4">
                <PokemonDataTable />
            </div>
        </>
    );
};
