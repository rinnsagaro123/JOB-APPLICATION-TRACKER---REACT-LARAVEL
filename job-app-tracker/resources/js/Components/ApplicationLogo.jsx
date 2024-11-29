export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src="/assets/trackmyjob.png" // Path to the logo in the public/assets folder
            className="h-12 w-auto"
        />
    );
}
