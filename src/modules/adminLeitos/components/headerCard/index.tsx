import { Card } from "@components/ui/card";
import { Label } from "@components/ui/label";
import { Separator } from "@components/ui/separator";
import { Skeleton } from "@components/ui/skeleton";
import { FaArrowRight } from "react-icons/fa6";

type propsValue = {
    value?: number;
    label?: string;
    action?: () => void;
    loading?: boolean;
};

type values = {
    loading: boolean;
    cards: propsValue[];
};

const HeaderAdminCard = ({ loading, cards }: values) => {
    return loading ? (
        <Skeleton className="w-2/3 h-36 flex items-center justify-center rounded-xl bg-white shadow-lg" />
    ) : (
        <>
            {cards?.length > 0 && (
                <Card className="w-2/3 h-36 flex flex-row rounded-xl">
                    {cards?.map((card, index) => (
                        <>
                            {card.loading ? (
                                <Skeleton className="w-2/3 h-36 flex items-center justify-center rounded-xl bg-white shadow-lg" />
                            ) : (
                                <>
                                    <div
                                        key={index}
                                        className={`w-full h-full flex flex-col ${card.action &&
                                            "cursor-pointer hover:scale-105 transition-all"
                                            } `}
                                        onClick={() => card.action && card.action()}
                                    >
                                        <div className="flex flex-col h-full items-center justify-center">
                                            <Label className="text-3xl font-semibold text-primary p-2">
                                                {card.value}
                                            </Label>
                                            <p className="text-gray-400">{card.label}</p>
                                        </div>
                                        {card.action && (
                                            <div className="absolute p-2">
                                                <FaArrowRight className="text-sky-600" size={20} />
                                            </div>
                                        )}
                                    </div>
                                    {cards.length - 1 !== index && (
                                        <Separator className="bg-gray-100 w-0.5 h-50" />
                                    )}
                                </>
                            )}
                        </>
                    ))}
                </Card>
            )}
        </>
    );
};

export { HeaderAdminCard };
