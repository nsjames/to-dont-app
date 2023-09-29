export default function Box(props: any) {
    return (
        <section className="w-[400px] h-[432px] bg-white shadow py-[30px] relative">
            <figure className="absolute bottom-0 left-0 right-0 w-full h-[100px] bg-gradient-to-t from-white to-transparent z-20 pointer-events-none"></figure>

            <figure className="text-black text-2xl font-black leading-none px-[30px]">
                <span>TO<br/>DO</span>
                <span className="text-red-500">N’T</span>
            </figure>

            {props.children}
        </section>
    )
}
