import { Card } from "antd";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <Card title="Hi, " bordered={true} style={{ width: 400 }}>
            I made two UIs, the first one using
            <ul>
                <li> Ant Design - <Link to={`/ant`}>/ant</Link> </li>
                <li> Material UI - <Link to={`/mui`}>/mui</Link> </li>
            </ul>
            I used the following references
            <ul>
                <li><a href="https://ant.design/components/table/">https://ant.design/components/table/</a></li>
                <li><a href="https://www.material-react-table.com/">https://www.material-react-table.com/</a></li>
            </ul>
        </Card>
    )
}
