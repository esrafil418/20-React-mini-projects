import { useEffect, useState } from "react";
import "./styles.css";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

type ImageSliderProps = {
	url: string;
	limit: number;
	page: number;
};

export default function ImageSlider({
	url,
	limit = 5,
	page = 1,
}: ImageSliderProps) {
	const [images, setImages] = useState<{ id: string; download_url: string }[]>(
		[],
	);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [errorMsg, setErrorMsg] = useState(null);
	const [loading, setLoading] = useState(false);

	async function fetchImages(getUrl) {
		try {
			setLoading(true);

			const respone = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
			const data = await respone.json();

			if (data) {
				setImages(data);
				setLoading(false);
			}
		} catch (error) {
			setErrorMsg(error.message);
			setLoading(false);
		}
	}

	function handlePre() {
		setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide - 1);
	}

	function handleNext() {
		setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
	}

	useEffect(() => {
		if (url !== "") fetchImages(url);
	}, [url]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (errorMsg !== null) {
		return <div>Error! {errorMsg}</div>;
	}

	return (
		<div className="container">
			<BsArrowLeftCircleFill onClick={handlePre} className="arrow arrow-left" />

			{images && images.length
				? images.map((imageItem, index) => (
						<img
							key={imageItem.id}
							alt={imageItem.download_url}
							src={imageItem.download_url}
							className={
								currentSlide === index
									? "current-image"
									: "current-image hide-current-image"
							}
						/>
					))
				: null}

			<BsArrowRightCircleFill
				onClick={handleNext}
				className="arrow arrow-right"
			/>
		</div>
	);
}
