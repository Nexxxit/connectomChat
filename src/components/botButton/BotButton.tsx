import ExternalLinkIcon from "../../assets/icons/ExternalLinkIcon";

interface BotButtonProps {
  link?: string;
  text: string;
}

export default function BotButton({ link, text }: BotButtonProps) {
  return (
    <>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className=" 
            relative
            inline-flex
            items-center
            justify-center
            bg-transparent
            backdrop-blur-sm
            bg-opacity-20
            border
            border-white/30
            text-white/90
            hover:bg-white/10
            transition-all
            duration-200
            rounded-xl
            px-4
            py-2
            text-sm
            shadow-md
            hover:shadow-lg
            pl-6
            pr-10
            me-10
            group
            "
        >
          <span
            className="absolute 
            top-1.5
            right-2 
            p-0.5
            transform 
            duration-200
            group-hover:scale-110
            "
          >
            <ExternalLinkIcon className="w-3 h-3 opacity-80 group-hover:opacity-100" />
          </span>
          <span className="text-center">{text}</span>
        </a>
      )}
    </>
  );
}
