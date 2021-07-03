import React, { useEffect, useState } from 'react';
import PocketService from '../../services/PocketService';
import { Table } from 'reactstrap';
import EditableAction from './EditableAction';
import { useParams, Link } from 'react-router-dom';

export default function() {
    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editedAction, setEditedAction] = useState({});
    const { pocketId } = useParams();

    useEffect(() => {
        async function getAllActions() {
            const actions = await PocketService.getAllActions();
            setActions(actions);
            setLoading(false);
        };

        async function getPocketActions() {
            const actions = await PocketService.getPocketActions(pocketId);
            setActions(actions);
            setLoading(false);
        };

        if (pocketId) {
            getPocketActions();
        } else {
            getAllActions();
        }
    }, [pocketId]);

    const handleActionEdit = action => setEditedAction(action);

    return (
        <div className="col-12">
            { loading && <div className="loading mx-auto col-md-8"></div> }
            { !loading &&
                <>
                    {pocketId && (
                        <div className="text-right mr-2 mt-2">
                            <Link to="/">Back to Home</Link>
                        </div>
                    )}
                    <div className="action-list">
                        <h2 className="text-center">
                            Action List
                            {pocketId && ` of ${actions[0].pocketName}`}
                        </h2>
                        <Table className="mx-auto col-md-8" striped>
                            <thead>
                                <tr>
                                    <th>Pocket</th>
                                    <th>Amount</th>
                                    <th>Direction</th>
                                    <th>Movement</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                actions.map( action => {
                                    return <EditableAction
                                                action={ action }
                                                key={ action.key }
                                                edited={ editedAction.key === action.key }
                                                handleActionEdit={ handleActionEdit }></EditableAction>
                                })
                            }
                            </tbody>
                        </Table>
                    </div>
                </>
            }
        </div>
    );
};
