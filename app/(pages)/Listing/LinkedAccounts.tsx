
import {
    faFacebook,
    faGithub,
    faGoogle,
    faStackOverflow,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const LinkedAccounts = () => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Languages</h3>
                <button className="text-gray-500 hover:text-gray-700">
                    <FontAwesomeIcon icon={faPen} />
                </button>
            </div>
            <div className="text-gray-600">
                <p>English - Basic</p>
                <p>Vietnamese (Tiếng Việt) - Native/Bilingual</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Linked Accounts</h3>
            </div>
            <div className="space-y-2">
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faFacebook} className="mr-2 text-blue-600" />
                    <span className="text-gray-800">Facebook</span>
                </div>
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faGoogle} className="mr-2 text-red-600" />
                    <span className="text-gray-800">Google</span>
                </div>
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faGithub} className="mr-2 text-gray-800" />
                    <span className="text-gray-800">Github</span>
                </div>
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faTwitter} className="mr-2 text-blue-400" />
                    <span className="text-gray-800">Twitter</span>
                </div>
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faStackOverflow} className="mr-2 text-orange-500" />
                    <span className="text-gray-800">Stack Overflow</span>
                </div>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Skills</h3>
                <button className="text-gray-500 hover:text-gray-700">
                    <FontAwesomeIcon icon={faPen} />
                </button>
            </div>
            <div className="text-gray-600">
                <p>React, Node.js, TypeScript</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Education</h3>
                <button className="text-gray-500 hover:text-gray-700">
                    <FontAwesomeIcon icon={faPen} />
                </button>
            </div>
            <div className="text-gray-600">
                <p>CYBERSOFT</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Certification</h3>
                <button className="text-gray-500 hover:text-gray-700">
                    <FontAwesomeIcon icon={faPen} />
                </button>
            </div>
        </div>
    );
};

export default LinkedAccounts;
