import {Component} from "react";

let data = require('../data/dataset.json');
let now = new Date();
let months = calculateThreePastMonths(now.getMonth())

class RewardPoints extends Component {
    render() {
        let auxDate = new Date();
        const users = data.map((obj) => {
            let totalPoints = 0;
            return (
                <div key={obj.user.id}>
                    User: {obj.user.name}
                    {
                        months.map((month) => {
                            let pointsByMonth = 0;
                            auxDate.setMonth(month);
                            for (const purchase of obj.purchases) {
                                totalPoints += getPointsByQuantity(purchase.quantity);
                                let currentDate = new Date(purchase.date);
                                let currentYear = new Date().getFullYear();
                                if (currentDate.getFullYear() === currentYear && currentDate.getMonth() === month) {
                                    pointsByMonth += getPointsByQuantity(purchase.quantity);
                                }
                            }
                            return <p
                                key={month}>{auxDate.toLocaleString('default', {month: 'long'})}: {pointsByMonth}</p>
                        })
                    }
                    <p key={obj.user.id}>Total: {totalPoints}</p>
                </div>
            )
        })
        return (
            <div className="Rewards">
                {users}
            </div>
        );
    }
}

function calculateThreePastMonths(month) {
    if (month >= 2) {
        return [(month), (month - 1), (month - 2)]
    } else if (month > 0) {
        return [(month), (month - 1), 11]
    } else {
        return [(month), 11, 10]
    }
}

function getPointsByQuantity(quantity) {
    let points = 0;
    if (quantity > 100) {
        points = ((quantity - 100) * 2) + 50;
    } else if (quantity > 50) {
        points += quantity - 50;
    }
    return points;
}

export default RewardPoints;
