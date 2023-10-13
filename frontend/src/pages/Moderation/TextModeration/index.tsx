import styles from "@/pages/Moderation/TextModeration/index.module.css"

import { FormEvent, useEffect, useMemo, useRef, useState} from "react";
import { useSearchParams } from "react-router-dom";

import { PageHeader } from "@/pages/Moderation/components/PageHeader/PageHeader";
import { PageContentLayout } from "@/pages/Moderation/components/PageContentLayout/PageContentLayout";
import { InfoCard } from "@/pages/Moderation/components/InfoCard/InfoCard";

import { ColorVariant, ModPageTab, ModerationType, RoleEnum } from "@/interfaces";
import { useAppDispatch, useAppSelector, usePageTitle } from "@/hooks";
import { generateAPIToken } from "@/store/auth";

import debounce from "lodash.debounce"
import Button from "@/components/ui/Button";


export const TextModeration = () => {
    type Response = {
        toxic: string,
        severe_toxic: string,
        insult: string,
        obscene: string,
        identity_hate: string,
        threat: string
    }

    usePageTitle("TEXT MODERATION | CLOUD");

    const dispatch = useAppDispatch();
    const apiField = useRef<HTMLDivElement>(null)
    const { token, user } = useAppSelector(state => state.auth)
    const [response, setResponse] = useState<Response>({
        toxic: '-',
        severe_toxic: '-',
        obscene: '-',
        threat: '-',
        insult: '-',
        identity_hate: '-',
    }) 

    const [requestText, setRequestText] = useState<string>('');
    const debouncedSetRequestText = debounce(setRequestText, 1000);

    const sendRequest = async (text: string) => {
        const res = await fetch("http://127.0.0.1:8000/moderation/text", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({text})
        })
        const obj = await res.json()
        delete obj.text
        setResponse(obj);

    }

    useEffect(() => {if (requestText.length > 0) sendRequest(requestText)}, [requestText])



    const infoDescription = `Lorem ipsum dolor sit amet consectetur. Faucibus sed magna libero leo. 
    Justo luctus bibendum nisl quis quis sed. Pulvinar sollicitudin magna lorem nisl quam quis.`
    
    const pageDescription = `Lorem ipsum dolor sit amet consectetur. Pretium nunc fermentum mattis velit nunc nibh leo gravida amet. Aliquet vitae in sagittis turpis ut urna sed. Malesuada sodales mattis commodo pretium fermentum cras etiam sed sed. Amet mauris viverra gravida vulputate sit leo ipsum.
    Nunc interdum duis non eget pellentesque odio pellentesque rhoncus. Ultricies lacus condimentum ipsum mattis proin urna. Dui sapien tellus quis eu sit eget tristique. Cras curabitur praesent fusce quis amet nibh dolor velit id. Aliquet leo in sit sit lacinia massa metus in vulputate. `
    
    const [searchParams, _] = useSearchParams();

    const tab  = useMemo(() => {
        const tab = searchParams.get("tab")?.toUpperCase();
        return tab ?? "INFO";
    }, [searchParams]);    

    const showAPIKey = () =>{
        let isVisible = false; 

        return () => { 
            if (!isVisible){ 
                (apiField.current as HTMLDivElement).innerText = user!.api_token; 
                isVisible = !isVisible
            } else { 
                (apiField.current as HTMLDivElement).innerText = "API TOKEN"; 
                isVisible = !isVisible
            }
        }
    }


    return (
        <>
        <PageHeader tab={tab as ModPageTab} title="TEXT MODERATION" description={pageDescription} variant={ModerationType.text}/>
        <PageContentLayout>
            {(tab === "INFO") && (
            <>
            <InfoCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240" fill="none"><path d="M128.7 150.7L103.3 125.6L103.6 125.3C120.541 106.471 133.199 84.1925 140.7 60H170V40H100V20H80V40H10V60H121.7C115 79.2 104.4 97.5 90 113.5C80.7 103.2 73 91.9 66.9 80H46.9C54.2 96.3 64.2 111.7 76.7 125.6L25.8 175.8L40 190L90 140L121.1 171.1L128.7 150.7ZM185 100H165L120 220H140L151.2 190H198.7L210 220H230L185 100ZM158.8 170L175 126.7L191.2 170H158.8Z" fill="black"/></svg>} 
                title="Different languages" 
                description={infoDescription} 
            />
            <InfoCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240" fill="none"><path d="M73.56 33.516C81.7437 27.3182 91.7343 23.9754 102 24C104.88 24 107.172 25.5 108.504 26.532C109.992 27.708 111.384 29.208 112.632 30.708C113.517 31.7828 114.001 33.1318 114 34.524V78H100.98C99.5646 73.9967 96.7796 70.6227 93.1171 68.4742C89.4547 66.3258 85.1506 65.5412 80.9656 66.2592C76.7806 66.9773 72.9842 69.1516 70.2474 72.3981C67.5105 75.6445 66.0094 79.7539 66.0094 84C66.0094 88.2461 67.5105 92.3556 70.2474 95.602C72.9842 98.8484 76.7806 101.023 80.9656 101.741C85.1506 102.459 89.4547 101.674 93.1171 99.5258C96.7796 97.3773 99.5646 94.0033 100.98 90H114V202.98C114.001 203.868 113.804 204.746 113.424 205.549C113.044 206.352 112.491 207.061 111.804 207.624C106.26 212.16 98.844 216 90 216C75.768 216 65.172 208.824 58.32 200.244C53.3971 194.131 50.0253 186.918 48.492 179.22C43.8298 177.977 39.507 175.701 35.844 172.56C29.22 166.884 24 157.68 24 144C24 137.316 24.444 131.28 25.44 126H63C70.632 126 76.92 131.7 77.88 139.068C73.8894 140.512 70.5373 143.32 68.4158 146.996C66.2943 150.671 65.5397 154.978 66.2853 159.156C67.0309 163.334 69.2288 167.114 72.4908 169.829C75.7528 172.544 79.8691 174.019 84.1129 173.993C88.3568 173.968 92.4552 172.444 95.6845 169.69C98.9138 166.937 101.066 163.131 101.762 158.944C102.458 154.758 101.652 150.46 99.4863 146.81C97.3209 143.16 93.9356 140.392 89.928 138.996C89.4222 132.2 86.3656 125.847 81.3713 121.211C76.377 116.575 69.8144 113.999 63 114H29.292C31.128 110.424 33.588 107.4 36.792 105.252C37.6025 104.716 38.453 104.242 39.336 103.836C35.928 93.852 36.816 82.164 40.104 72.984C42.204 67.08 45.54 61.5 50.124 57.78C53.148 55.32 56.748 53.7 60.684 53.388C62.412 45.192 67.26 38.412 73.56 33.516ZM126 174H135C142.161 174 149.028 171.155 154.092 166.092C159.155 161.028 162 154.161 162 147V124.98C166.003 123.565 169.377 120.78 171.526 117.117C173.674 113.455 174.459 109.151 173.741 104.966C173.023 100.781 170.848 96.9842 167.602 94.2474C164.356 91.5105 160.246 90.0095 156 90.0095C151.754 90.0095 147.644 91.5105 144.398 94.2474C141.152 96.9842 138.977 100.781 138.259 104.966C137.541 109.151 138.326 113.455 140.474 117.117C142.623 120.78 145.997 123.565 150 124.98V147C150 155.28 143.28 162 135 162H126V34.524C125.999 33.1318 126.483 31.7828 127.368 30.708C128.604 29.208 130.008 27.708 131.496 26.532C132.816 25.5 135.108 24 138 24C148.266 23.9754 158.256 27.3182 166.44 33.516C172.74 38.412 177.6 45.192 179.316 53.388C183.252 53.688 186.852 55.32 189.876 57.78C194.46 61.5 197.796 67.08 199.896 72.984C203.184 82.164 204.072 93.864 200.664 103.824C201.528 104.232 202.38 104.712 203.208 105.264C206.508 107.46 209.016 110.604 210.864 114.312C214.5 121.572 216 131.7 216 144C216 157.692 210.78 166.884 204.156 172.56C200.493 175.701 196.17 177.977 191.508 179.22C190.308 185.916 186.948 193.668 181.68 200.244C174.84 208.824 164.232 216 150 216C141.168 216 133.74 212.16 128.208 207.624C127.519 207.062 126.963 206.354 126.581 205.551C126.199 204.747 126.001 203.869 126 202.98V174ZM84 78C82.4087 78 80.8826 78.6322 79.7574 79.7574C78.6321 80.8826 78 82.4087 78 84C78 85.5913 78.6321 87.1174 79.7574 88.2427C80.8826 89.3679 82.4087 90 84 90C85.5913 90 87.1174 89.3679 88.2426 88.2427C89.3679 87.1174 90 85.5913 90 84C90 82.4087 89.3679 80.8826 88.2426 79.7574C87.1174 78.6322 85.5913 78 84 78ZM84 150C82.4087 150 80.8826 150.632 79.7574 151.757C78.6321 152.883 78 154.409 78 156C78 157.591 78.6321 159.117 79.7574 160.243C80.8826 161.368 82.4087 162 84 162C85.5913 162 87.1174 161.368 88.2426 160.243C89.3679 159.117 90 157.591 90 156C90 154.409 89.3679 152.883 88.2426 151.757C87.1174 150.632 85.5913 150 84 150ZM156 114C157.591 114 159.117 113.368 160.243 112.243C161.368 111.117 162 109.591 162 108C162 106.409 161.368 104.883 160.243 103.757C159.117 102.632 157.591 102 156 102C154.409 102 152.883 102.632 151.757 103.757C150.632 104.883 150 106.409 150 108C150 109.591 150.632 111.117 151.757 112.243C152.883 113.368 154.409 114 156 114Z" fill="black"/></svg>} 
                title="Improving algorithms" 
                description={infoDescription} 
            />
            <InfoCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240" fill="none"><path d="M195 45C186.83 52.8195 177.111 58.839 166.47 62.67C155.25 64.65 124.2 50.25 108.9 64.95C106.35 67.5 103.2 70.05 99.9 72.6C92.7 69.45 81.6 64.65 73.5 60C65.4 55.35 45 45 45 45L0 97.5C0 97.5 11.1 112.5 18 122.4C22.5 129 28.05 139.05 31.65 145.8L26.55 151.8C25.3287 154.226 24.8892 156.971 25.2922 159.657C25.6951 162.344 26.9206 164.839 28.8 166.8C30.9693 168.426 33.6088 169.303 36.32 169.298C39.0313 169.292 41.6672 168.405 43.83 166.77C43.028 167.709 42.4211 168.798 42.0446 169.974C41.6681 171.15 41.5296 172.389 41.6371 173.62C41.7446 174.85 42.096 176.046 42.6708 177.139C43.2456 178.232 44.0323 179.199 44.985 179.985C47.2755 181.323 49.8815 182.025 52.5341 182.02C55.1866 182.015 57.7898 181.302 60.075 179.955C58.3612 182.091 57.4234 184.746 57.4152 187.485C57.407 190.223 58.329 192.884 60.03 195.03C62.2412 195.795 64.5993 196.039 66.9204 195.743C69.2414 195.446 71.4624 194.617 73.41 193.32C72.4397 195.616 72.1884 198.153 72.6892 200.595C73.1899 203.038 74.4193 205.271 76.215 207C78.7516 208.127 81.5329 208.592 84.2981 208.35C87.0633 208.109 89.722 207.17 92.025 205.62L99.765 198.615C106.845 205.665 116.61 210.03 127.395 210.03L128.31 210.015C131.864 209.712 135.269 208.447 138.16 206.357C141.05 204.267 143.318 201.43 144.72 198.15C146.91 198.99 149.4 199.56 152.04 199.56C155.58 199.56 158.865 198.54 161.64 196.785C170.415 190.98 168.315 186.48 168.315 186.48C171.435 187.823 174.901 188.142 178.214 187.39C181.527 186.637 184.516 184.854 186.75 182.295C189.072 179.92 190.536 176.838 190.911 173.538C191.286 170.237 190.55 166.906 188.82 164.07C188.915 164.127 189.025 164.153 189.135 164.145C195.45 164.145 200.94 160.665 203.805 155.535C205.215 151.889 205.691 147.948 205.191 144.071C204.691 140.194 203.229 136.504 200.94 133.335L200.985 133.41C213.285 131.01 212.835 124.86 218.835 115.86C224.516 108.515 231.585 102.359 239.64 97.74L195 45ZM194.25 150.9C187.65 157.5 182.55 154.65 171.3 146.1C160.05 137.55 137.7 121.5 137.7 121.5C138.615 126.075 140.73 130.05 143.715 133.215C148.5 138.6 162.75 150.9 169.5 157.2C173.7 161.1 184.5 168.9 178.2 174.9C171.9 180.9 166.95 174.9 156.6 166.5C146.25 158.1 123.15 137.4 123.15 137.4C123.023 139.384 123.318 141.373 124.016 143.235C124.714 145.096 125.799 146.789 127.2 148.2C129.75 151.2 144 165 150 171.3C156 177.6 161.25 181.35 156.15 186.3C151.05 191.25 140.7 183.45 135 177.6C126.15 169.05 108.6 153.15 108.6 153.15L108.585 153.945C108.585 158.205 110.055 162.105 112.53 165.195C116.85 170.865 125.25 178.215 130.35 183.915C135.45 189.615 138.45 194.415 130.35 198.915C122.25 203.415 110.25 192.315 105 186.915V186.885C105.001 185.403 104.469 183.971 103.5 182.85C101.706 181.188 99.492 180.047 97.0972 179.55C94.7024 179.053 92.2174 179.219 89.91 180.03C90.8594 179.18 91.6204 178.141 92.1442 176.979C92.668 175.818 92.943 174.559 92.9515 173.285C92.9599 172.011 92.7017 170.749 92.1934 169.58C91.6851 168.412 90.938 167.363 90 166.5C88.031 165.008 85.6278 164.202 83.1575 164.205C80.6872 164.207 78.2857 165.019 76.32 166.515C77.3139 165.566 78.0812 164.404 78.5648 163.118C79.0485 161.831 79.236 160.452 79.1135 159.083C78.991 157.714 78.5616 156.39 77.8573 155.21C77.1529 154.029 76.1917 153.023 75.045 152.265C72.3597 150.578 69.2088 149.785 66.0448 150.001C62.8808 150.216 59.8666 151.429 57.435 153.465C59.0601 151.495 59.8613 148.974 59.6713 146.428C59.4812 143.881 58.3145 141.507 56.415 139.8C54.0542 137.603 51.0458 136.228 47.8392 135.882C44.6327 135.536 41.4003 136.237 38.625 137.88L28.65 121.035C21.75 110.085 13.65 98.685 13.65 98.685L47.85 57.135C47.85 57.135 60 64.635 70.05 70.335C75 73.185 83.55 76.935 90 79.935C79.8 87.585 71.25 94.935 73.8 100.035C78.3443 103.297 83.7751 105.096 89.3682 105.193C94.9613 105.289 100.451 103.678 105.105 100.575C111.072 96.6079 118.084 94.5039 125.25 94.53C130.455 94.53 135.405 95.61 139.89 97.575C148.2 103.185 163.5 116.985 177.45 125.685C195 138.435 198.45 146.685 194.25 150.885V150.9Z" fill="black"/></svg>} 
                title="Cooperation" 
                description={infoDescription} 
            />
            </>
            )}

            {tab === "PLAYGROUND" && (
            <>
            <div className={styles.playgroundWrapper}>
                <div className={styles.playgroundSection}>
                    <div className={styles.requestContainer}>
                        <div className={styles.requestContent} 
                            placeholder="Type Request Text"
                            contentEditable
                            suppressContentEditableWarning
                            onInput={(e: FormEvent<HTMLDivElement>)  => {debouncedSetRequestText(e.currentTarget.textContent ?? '')}}
                        />
                    </div>
                </div>
                <div className={styles.playgroundSection}>
                    <div className={styles.responseContainer}>
                        <div className={styles.responseContent}>
                            <div className={styles.responseDataContainer}>
                                response.json
                                <div className={styles.responseDataContent}>
                                    {"BODY: {"}
                                        {/* @ts-ignore-error */}
                                        {Object.getOwnPropertyNames(response).map((prop, ind) => (<div className={styles.responseDataField} key={ind}><div>{prop}:</div><div>{parseFloat(response[prop]).toFixed(4)},</div></div>))}
                                    {"}"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
            )}

            {tab === "INTEGRATION" && user && (
            <div className={styles.integrationWrapper}>
                <div className={styles.integrationSection}>
                    <div className={styles.apiInfo}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a magna bibendum, vestibulum eros et, accumsan urna. Etiam cursus sodales fringilla. Aenean a lectus nec ipsum lobortis euismod. Suspendisse potenti. Vestibulum viverra libero a blandit lacinia. Suspendisse accumsan nibh a purus fringilla, vel consectetur mi mollis. Maecenas et sem mi. Nam auctor pulvinar interdum.</p>

                        <p>Nulla aliquet, lacus hendrerit vestibulum fringilla, lorem tortor finibus leo, tristique mollis erat nisi venenatis metus. Quisque eu congue odio. Duis non mollis ex, in luctus nisi. Donec sed odio laoreet, porta sem ac, egestas ante. Donec auctor rhoncus leo. Phasellus quis placerat augue. Suspendisse in ante ut odio cursus blandit nec in nulla. Sed sed urna non quam ornare pulvinar.</p>
                    </div>
                    {user.api_token ? (
                        <div className={styles.apiContainer}>
                            <div className={styles.apiContent}>
                                <div className={styles.apiData} ref={apiField}>API TOKEN</div>
                                <div className={styles.apiActions}>
                                    <div className={styles.apiAction} onClick={showAPIKey()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9ZM12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z" fill="white"/>
                                        </svg>
                                    </div>
                                    <div className={styles.apiAction} onClick={() => {navigator.clipboard.writeText(user.api_token)}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M2.625 22.5H17.625C17.9234 22.5 18.2095 22.3815 18.4205 22.1705C18.6315 21.9595 18.75 21.6734 18.75 21.375V6C18.75 5.80109 18.671 5.61032 18.5303 5.46967C18.3897 5.32902 18.1989 5.25 18 5.25H2.625C2.32663 5.25 2.04048 5.36853 1.82951 5.5795C1.61853 5.79048 1.5 6.07663 1.5 6.375V21.375C1.5 21.6734 1.61853 21.9595 1.82951 22.1705C2.04048 22.3815 2.32663 22.5 2.625 22.5Z" fill="white"/>
                                            <path d="M18.75 3.75H5.25V2.625C5.25 2.32663 5.36853 2.04048 5.57951 1.8295C5.79048 1.61853 6.07663 1.5 6.375 1.5H21.1875C21.5356 1.5 21.8694 1.63828 22.1156 1.88442C22.3617 2.13056 22.5 2.4644 22.5 2.8125V17.625C22.5 17.9234 22.3815 18.2095 22.1705 18.4205C21.9595 18.6315 21.6734 18.75 21.375 18.75H20.25V5.25C20.25 4.85218 20.092 4.47064 19.8107 4.18934C19.5294 3.90804 19.1478 3.75 18.75 3.75Z" fill="white"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ) : (
                        <div className={styles.apiGenerateButton}>
                            <Button text="Generate API Key" variant={ColorVariant.black} className="width-100" onClick={token ? () => {dispatch(generateAPIToken({token}))} : () => {}} disabled={!(user.role !== RoleEnum.User)}/>
                        </div>
                    )}
                </div>
                <div className={styles.playgroundSection}>
                </div>
            </div>
            )}
            
        </PageContentLayout>
        </>
    );
};