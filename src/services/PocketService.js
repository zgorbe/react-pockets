import { pockectsRef, db } from '../firebase';

class PocketService {
    addAction(pocketId, amount, direction) {
        var pocketRef = db.ref('pockets/' + pocketId),
            actionsRef = db.ref('pockets/' + pocketId + '/actions');

        pocketRef.once('value', snapshot => {
            let pocketData = snapshot.val(),
                newBalance = 0;

            if (direction === 'plus') {
                newBalance = pocketData.balance + amount;    
            } else {
                newBalance = pocketData.balance - amount;
            }

            if (newBalance > 0) {
                pocketRef.update({
                    balance: newBalance,
                    timestamp: new Date().getTime()
                });

                actionsRef.push({
                    amount: amount,
                    direction: direction,
                    pocket: pocketId,
                    timestamp: new Date().getTime()
                });
            }
        });
    }
    addMovement(sourcePocketId, destinationPocketId, amount) {
        console.log(sourcePocketId, destinationPocketId);
    }

    getPockets() {
        return pockectsRef.once('value').then((snapshot) => {
            let data = snapshot.val(),
                pockets = [];

            for (let id of Object.keys(data)) {
                data[id].id = id;
                pockets.push(data[id]);
            }
            return pockets;
        });
    }
}

const pocketService = new PocketService();
export default pocketService;