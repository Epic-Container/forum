import React from "react";

interface ForumProps {
    title: string,
    mainContent: string
}
const Forum: React.FC<ForumProps> = ({title, mainContent}) => {
    return (
        <div className="border-2 border-border rounded-lg p-5">
            <div>
                <h1 className="text-2xl content1 pb-5">{title}</h1>
                <h2 className="content2">{mainContent}</h2>
            </div>
        </div>
    );
};
export default Forum;