import { PageHeader, QueryBoundary } from '@features/ui';
import { ManagePokemon } from '@features/admin/manage-pokemon';

export const ManagePokemonPage: React.FC = () => {
    return (
        <div className="px-4">
            <PageHeader
                pageHeading={'Manage Pokemons'}
                pageDescription={'Configure Pokemon availability.'}
            />
            <QueryBoundary>
                <ManagePokemon />
            </QueryBoundary>
        </div>
    );
};
