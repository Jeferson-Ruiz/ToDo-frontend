interface TitleProps {
  text: string
}

export function Title({ text }: TitleProps) {
  return <h2 className="text-xl font-bold text-gray-900 dark:text-white">{text}</h2>
}
