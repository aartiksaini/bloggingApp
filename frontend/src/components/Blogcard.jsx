import { Link } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";
import PropTypes from 'prop-types';


export const BlogCard = ({
    id,
    name,
    title,
    content,
    publishedDate
}) => {
    const wordCount = content.split(/\s+/).length;
    let minutes = Math.ceil(wordCount / 200);
    let minutesString= minutes.toString();
    return (
       
            <div className='max-w-md mx-auto bg-slate-70 rounded-xl shadow-md overflow-hidden md:max-w-4xl p-4 border-2 border-white bg-green-200'>
                <div className='md:flex'>
                    <div className='p-11'>
                        <div className='uppercase tracking-wide text-sm text-green-950 font-semibold'>{name}</div>
                        <a href="#" className='block mt-1 text-lg leading-tight font-medium text-green-950 hover:underline'>{title}</a>
                        <p className='mt-2 text-gray-500'>{content.length >= 100 ? `${content.slice(0, 100)}.....` : content}</p>
                    </div>
                    <div className='flex justify-end items-center flex-grow'>
                        <div className='invisible lg:visible '>
                            <Avatar name={name} />
                            <div className='text-xs font-thin text-gray-900'>{name}</div>


                            <Link to={`/blog/${id}`}>
                            <div>
                                <BsThreeDotsVertical />
                            </div>
                            </Link>


                        </div>
                        <div className='ml-3 '>
                            <div className='flex space-x-1 text-sm text-gray-500 invisible lg:visible'>
                                <time dateTime={publishedDate}>{publishedDate}</time>
                            </div>
                            <div className='text-xs mt-5 font-thin invisible lg:visible'>{minutesString} min read</div>
                        </div>
                    </div>

                </div>

            </div>
        
    );
};

export function Avatar({ name }) {
    return (
        <div className="flex-shrink-0">
            <span className="inline-block h-6 w-6 rounded-full overflow-hidden bg-gray-100">
                <span className="text-sm font-medium justify-center leading-none text-gray-600 pl-2">{name[0]}</span>
            </span>
        </div>
    );
}



BlogCard.propTypes = {
    id: PropTypes.func.isRequired,
    name: PropTypes.func.isRequired,
    title: PropTypes.func.isRequired,
    publishedDate: PropTypes.func.isRequired,
    content: PropTypes.func.isRequired,
};
Avatar.propTypes = {
  
    name: PropTypes.func.isRequired,
  
};