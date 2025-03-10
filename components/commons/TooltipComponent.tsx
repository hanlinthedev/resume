import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

type Props = {
	children: React.ReactNode;
	content: string;
};

const TooltipComponent = (props: Props) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{props.children}</TooltipTrigger>
				<TooltipContent>
					<p>{props.content}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default TooltipComponent;
