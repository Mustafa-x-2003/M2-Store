import CategoryCard from "./categoryCard"
export default function CategoryCardList({cats}){
    return(
        <div className="flex gap-2 flex-wrap ">
            {cats.map((cat,index)=>(<CategoryCard cat={cat} key={index}/>))}
        </div>
    )
}