import {classNames} from '../shared/lib/classNames/classNames.ts';
import {Suspense} from 'react';
import {AppRoute} from './providers/router';

function App() {
    return (
        <div id="app" className={classNames('app', {}, ['app_light_theme'])}>
            <Suspense fallback="">
                <div className="content-wrapper">
                    <AppRoute/>
                </div>
            </Suspense>
        </div>
    );
}

export default App;
